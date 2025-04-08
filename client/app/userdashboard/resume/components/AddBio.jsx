import { baseurl } from "@/app/config";
import { useStore } from "@/app/global/DataProvider";
import axios from "axios";
import React, { useState, useEffect } from "react";

const AddBio = () => {
  const { store } = useStore();
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
      if(primaryBio?.data) setBio(primaryBio?.data?.primaryData[0]);
      const { data } = await axios.get(`${baseurl}/auth/get-bio`, {
        headers: {
          Authorization: `Bearer ${store.token}`,
        },
      });

      console.log(data)
      const cvName = data?.name || "";
      setFirstName(cvName.split(" ")[0]);
      setLastName(cvName.split(" ")[cvName.split(" ").length - 1]);
      setTitle(data.title);
      setIsLoadingContainer(false);
    } catch (error) {
      console.log(error);
      setIsLoadingContainer(false);
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
    }
  };

  return (
    <div className="min-h-[50vh] flex justify-center items-center">
      {isLoadingContainer ? (
        <h2 className="mx-auto">Loading...</h2>
      ) : (
        <div className="w-full h-full">
          <h2
            className="ml-auto w-fit mt-8 px-6 py-1 rounded-md cursor-pointer bg-violet-500 text-white"
            onClick={openBioBox}
          >
            {editBio ? "Cancel" : "Edit"}
          </h2>
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
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
                    <button
                      disabled={isLoading}
                      type="submit"
                      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      {isLoading ? "Loading..." : "Save change"}
                    </button>
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
