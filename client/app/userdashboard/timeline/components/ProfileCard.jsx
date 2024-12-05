import { baseurl, viewurl } from '@/app/config';
import storeContext from '@/app/global/createContex';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { IoPersonAdd } from 'react-icons/io5';

const ProfileCard = ({id}) => {
    const { store} = useContext(storeContext);
    const [loader,setLoader] = useState(false)
    const [user,setUser] = useState()
    console.log(id)
    useEffect(() => {
      async function fetchData() {
        try {
            setLoader(true)
          const { data } = await axios.get(`${baseurl}/auth/publicuser/findbyid/${id}`, {
            headers: {
              Authorization: `Bearer ${store.token}`,
            },
          });
          setLoader(false)
          setUser(data)
        } catch (error) {
          console.log(error);
        }
      }
      fetchData();
    }, []);

    console.log(user)
      ////////////////////////friend request api////////////////////////
  const friendRequestApi = async (recipient) => {
    try {
      //   setLoader(true);
      setLoaderReq(true);
      const { data } = await axios.post(
        `${baseurl}/friend-request`,
        { recipient },
        {
          headers: {
            Authorization: `Bearer ${store.token}`,
          },
        }
      );
      handleNotification(recipient);
      // setAllQuestions(totalReadQuestions),
      //   setLoader(false);
    } catch (error) {
      // toast.error(error.response.data.message);
    }
  };
  

//   <div>
//   <Messanger
//     id={item._id}
//     name={item.name}
//     profile={item.profile}
//     title={item.title}
//     status={item.status}
//     desc={item.description}
//     switcher={openMessangerBox1}
//     setSwitcher={setOpenMessangerBox1}
//   />
// </div>
const [myFriend,setMyFriend] = useState()
const allFriendId = async ()=>{
  setLoader(true)
  const {data} = await axios.get(
    `${baseurl}/friend-request/get-friend/acceptedFriendId`,
    {
      headers: {
        Authorization: `Bearer ${store.token}`,
      },
    }
  );
  setLoader(false)
  const friendExist = data?.some(f=> f === id)
  setMyFriend(friendExist)
}
useEffect(() => {
  allFriendId()
}, []);
console.log(myFriend)
  return (
    <div className='bg-white shadow-lg rounded-2xl border py-4 px-2'>
        {
            loader ? "Loading..." : <div className="max-w-[400px] p-5">
               <div className='flex justify-center items-center gap-2'>
                 <img className='w-[100px]' src={user?.profile} alt={user?.name}/>
                <div className="">
                <h2 className='text-2xl font-semibold'>{user?.name.split(' ')[0]}</h2>
                <h2 className=''>{user?.title}</h2>
                <h2 className=''>{user?.description.slice(0,60)}...</h2>
                </div>
               </div>
               <div className="mt-3 flex justify-center gap-3 items-center">
                {
                  myFriend === undefined ? "Loading..." : myFriend === true ?  <div className="py-2 px-6 cursor-pointer rounded-lg bg-violet-500 text-white">Message</div> : <div className="py-2 flex items-end gap-2 px-6 cursor-pointer rounded-lg bg-violet-500 text-white">  <IoPersonAdd size={16} /> Add friend</div>
                }
                
                <a  href={`${viewurl}/userdashboard/searchusers/${id}`} className="py-2 px-6 cursor-pointer rounded-lg bg-violet-500 text-white">View details </a>
               </div>
            </div>
        }
    </div>
  )
}

export default ProfileCard