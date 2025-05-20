import { baseurl } from "@/app/config";
import { useStore } from "@/app/global/DataProvider";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { commonLogout } from "../../components/common";

const AddBio = () => {
  const { store ,dispatch} = useStore();
  const [bio, setBio] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState("");
  const [title, setTitle] = useState();
  const [number, setNumber] = useState();
  const [website, setWebsite] = useState("hdfkjghoi");
  const [location, setLocation] = useState();
  const [email, setEmail] = useState();
  const [editBio, setEditBio] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingContainer, setIsLoadingContainer] = useState(false);
  const primaryBio = {
    firstName,
    lastName,
    title,
    number,
    website,
    location,
    email,
  };
  const getPrimaryBio = async () => {
    try {
      setIsLoadingContainer(true);
      const primaryBio = await axios.get(
        `${baseurl}/user-resume/get-bio`,
        {
          headers: {
            Authorization: `Bearer ${store.token}`,
          },
        }
      );
      if(primaryBio?.data?.cvdata) setBio(primaryBio?.data?.cvdata?.primaryData[0]);
      const { data } = await axios.get(`${baseurl}/auth/get-bio`, {
        headers: {
          Authorization: `Bearer ${store.token}`,
        },
      });
      const cvName = data?.name || "";
      setFirstName(cvName.split(" ")[0]);
      setLastName(cvName.split(" ")[cvName.split(" ").length - 1]);
      setTitle(data.title);
      setIsLoadingContainer(false);
    } catch (error) {
      console.log(error);
      setIsLoadingContainer(false);
      commonLogout(dispatch,error)
    }
  };

  useEffect(() => {
    getPrimaryBio();
  }, []);
  const handleResumeForm = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        `${baseurl}/user-resume/create`,
        primaryBio,
        {
          headers: {
            Authorization: `Bearer ${store.token}`,
          },
        }
      );
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      commonLogout(dispatch,error)
    }
  };

  const openBioBox = () => {
    setEditBio(!editBio);
    if (editBio) return;
    setFirstName(bio.firstName);
    setLastName(bio.lastName);
    setTitle(bio.title);
    setNumber(bio.number);
    setLocation(bio.location);
    setWebsite(bio.website);
    setEmail(bio.email);
  };

  const editResumeForm = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        `${baseurl}/user-resume/edit-primary-bio`,
        primaryBio,
        {
          headers: {
            Authorization: `Bearer ${store.token}`,
          },
        }
      );
      setIsLoading(false);
      setEditBio(false);
    } catch (error) {
      setIsLoading(false);
      commonLogout(dispatch,error)
    }
  };
/////////////////////////////////////////////////////////////////////
  return (
    <div className="min-h-[60vh] w-full flex justify-center items-center">
      {isLoadingContainer ? (
        <h2 className="mx-auto"><AiOutlineLoading3Quarters className="animate-spin text-gray-700 text-center" size={20} /></h2>
      ) : (
        <div className="w-full h-full">
      {
        bio &&   !editBio &&  <h2
        class="text-white bg-violet-500 ml-auto hover:bg-violet-600 ring-[3px] cursor-pointer w-fit focus:outline-none ring-violet-300 font-medium rounded-lg px-5 py-1 text-center"
        onClick={openBioBox}
      >
        Edit
      </h2>
      }
          {!bio && (
            <form onSubmit={handleResumeForm} className="mt-4">
              <div class="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                  <label
                    for="first_name"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    First name
                  </label>
                  <input
                    onChange={(e) => setFirstName(e.target.value)}
                    value={firstName}
                    type="text"
                    id="first_name"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="John"
                    required
                  />
                </div>
                <div>
                  <label
                    for="last_name"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Last name
                  </label>
                  <input
                    onChange={(e) => setLastName(e.target.value)}
                    value={lastName}
                    type="text"
                    id="last_name"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Doe"
                    required
                  />
                </div>
                <div>
                  <label
                    for="company"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Status
                  </label>
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    type="text"
                    id="company"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Flowbite"
                    required
                  />
                </div>
                <div>
                  <label
                    for="phone"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Phone number
                  </label>
                  <input
                    onChange={(e) => setNumber(e.target.value)}
                    value={number}
                    type="tel"
                    id="phone"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="01XXXXXXXXX"
                    required
                  />
                </div>
                <div>
                  <label
                    for="website"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Website (optional)
                  </label>
                  <input
                    onChange={(e) => setWebsite(e.target.value)}
                    value={website}
                    type="url"
                    id="website"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="example.com"
                  />
                </div>
                <div>
                  <label
                    for="visitors"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Location
                  </label>
                  <input
                    onChange={(e) => setLocation(e.target.value)}
                    value={location}
                    type="text"
                    id="visitors"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder=""
                    required
                  />
                </div>
              </div>
              <div class="mb-6">
                <label
                  for="email"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email address
                </label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="email"
                  id="email"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="john.doe@company.com"
                  required
                />
              </div>
              <button
                type="submit"
                 class="text-white bg-violet-500 hover:bg-violet-600 ring-[3px] focus:outline-none ring-violet-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
              >
                Save
              </button>
            </form>
          )}

          {bio && (
            <div>
              {!editBio && (
                <div className=" mt-4 md:grid gap-8 text-gray-900 grid-cols-2">
                  <h2 className="bg-white py-1 md:py-4 px-6 rounded-sm border">
                    {" "}
                    <span className="font-bold">First name :</span>{" "}
                    {bio.firstName}
                  </h2>
                  <h2 className="bg-white py-1 md:py-4 px-6 rounded-sm border">
                    <span className="font-bold">Last name :</span>{" "}
                    {bio.lastName}
                  </h2>
                  <h2 className="bg-white py-1 md:py-4 px-6 rounded-sm border">
                    <span className="font-bold">Status :</span> {bio.title}
                  </h2>
                  <h2 className="bg-white py-1 md:py-4 px-6 rounded-sm border">
                    <span className="font-bold">Number :</span> {bio.number}
                  </h2>
                  <h2 className="bg-white py-1 md:py-4 px-6 rounded-sm border">
                    <span className="font-bold">Location :</span> {bio.location}
                  </h2>
                  {bio.website && (
                    <h2 className="bg-white py-1 md:py-4 px-6 rounded-sm border">
                      <span className="font-bold">Website :</span> {bio.website}
                    </h2>
                  )}
                  <h2 className="bg-white py-1 md:py-4 px-6 rounded-sm border">
                    <span className="font-bold">Email address :</span>{" "}
                    {bio.email}
                  </h2>
                </div>
              )}

              {editBio && (
                <>
                  <form onSubmit={editResumeForm} className="mt-4">
                    <div class="grid gap-6 mb-6 md:grid-cols-2">
                      <div>
                        <label
                          for="first_name"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          First name
                        </label>
                        <input
                          onChange={(e) => setFirstName(e.target.value)}
                          value={firstName}
                          type="text"
                          id="first_name"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="John"
                          required
                        />
                      </div>
                      <div>
                        <label
                          for="last_name"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Last name
                        </label>
                        <input
                          onChange={(e) => setLastName(e.target.value)}
                          value={lastName}
                          type="text"
                          id="last_name"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Doe"
                          required
                        />
                      </div>
                      <div>
                        <label
                          for="company"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Status
                        </label>
                        <input
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          type="text"
                          id="company"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Flowbite"
                          required
                        />
                      </div>
                      <div>
                        <label
                          for="phone"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Phone number
                        </label>
                        <input
                          onChange={(e) => setNumber(e.target.value)}
                          value={number}
                          type="tel"
                          id="phone"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="01XXXXXXXXX"
                          required
                        />
                      </div>
                      <div>
                        <label
                          for="website"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Website (optional)
                        </label>
                        <input
                          onChange={(e) => setWebsite(e.target.value)}
                          value={website}
                          type="url"
                          id="website"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="example.com"
                        />
                      </div>
                      <div>
                        <label
                          for="visitors"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Location
                        </label>
                        <input
                          onChange={(e) => setLocation(e.target.value)}
                          value={location}
                          type="text"
                          id="visitors"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder=""
                          required
                        />
                      </div>
                    </div>
                    <div class="mb-6">
                      <label
                        for="email"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Email address
                      </label>
                      <input
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        type="email"
                        id="email"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="john.doe@company.com"
                        required
                      />
                    </div>

                    <div className="flex items-center gap-2">
              <h2
                    class="text-white bg-violet-500 hover:bg-violet-600 ring-[3px] cursor-pointer w-fit focus:outline-none ring-violet-300 font-medium rounded-lg px-5 py-1 text-center"
                    onClick={openBioBox}
                  >
                    Cancel
                  </h2>
                  <button
                      disabled={isLoading}
                      type="submit"
                     class="text-white bg-violet-500 hover:bg-violet-600 ring-[3px] cursor-pointer w-fit focus:outline-none ring-violet-300 font-medium rounded-lg px-5 py-1 text-center"
                    >
                      {isLoading ?  <AiOutlineLoading3Quarters className="animate-spin text-white text-center" size={20} />  : "Save change"}
                    </button>
              </div>
                  </form>
                </>
              )}
            </div>
          )}
        </div>
      )}
      {}
    </div>
  );
};

export default AddBio;
