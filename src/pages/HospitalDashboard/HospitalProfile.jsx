import React, { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../Firebase/Config";
import {
  FiPhone,
  FiMail,
  FiEdit2,
  FiCheckCircle,
  FiClock,
  FiHome,
  FiX,
  FiPlus,
  FiTrash2,
  FiUpload,
  FiMapPin,
  FiCheck,
  FiShield
} from "react-icons/fi";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

// Yup Validation Schema
const ProfileSchema = Yup.object().shape({
  hospitalName: Yup.string().required("Hospital name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string().required("Phone is required"),
  city: Yup.string().required("City is required"),
  address: Yup.string().required("Address is required"),
  description: Yup.string().required("Description is required"),
});

export const HospitalProfile = () => {
  const [hospital, setHospital] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [logoFile, setLogoFile] = useState(null);
  const [vaccineInput, setVaccineInput] = useState("");

  useEffect(() => {
    fetchHospitalData();
  }, []);

  // Fetch data
  const fetchHospitalData = async () => {
    const user = auth.currentUser;
    if (!user) return;
    const docRef = doc(db, "hospitals", user.uid);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      setHospital(snapshot.data());
    }
  };

  // Save Formik Data
  const handleSave = async (values) => {
    setLoading(true);
    try {
      const user = auth.currentUser;
      const docRef = doc(db, "hospitals", user.uid);
      let updatedData = { ...values };

      if (logoFile) {
        const reader = new FileReader();
        reader.onloadend = async () => {
          updatedData.photo = reader.result;
          await updateDoc(docRef, updatedData);
          setHospital(updatedData);
          setShowEditModal(false);
        };
        reader.readAsDataURL(logoFile);
      } else {
        await updateDoc(docRef, updatedData);
        setHospital(updatedData);
        setShowEditModal(false);
      }
    } catch (error) {
      alert("Error updating profile");
      console.error(error);
    }
    setLoading(false);
  };

  if (!hospital) {
    return (
      <div className="text-center mt-32 text-2xl text-gray-600">
        Loading Profile...
      </div>
    );
  }

  return (
    <div className="px-4">
      <div className="max-w-6xl mx-auto">
        {/* Profile Card */}
        <div className="backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 overflow-hidden">
          {/* Header */}
          <div className="px-10 py-12 text-white relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-8">
                <div className="relative">
                  {hospital.photo ? (
                    <img
                      src={hospital.photo}
                      className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-2xl"
                    />
                  ) : (
                    <div className="w-32 h-32 rounded-full bg-white/30 flex items-center justify-center border-4 border-white/50 shadow-2xl">
                      <FiHome size={64} className="text-white" />
                    </div>
                  )}

                  <div
                    className={`absolute -bottom-3 -right-3 px-5 py-2 rounded-full font-bold text-sm flex items-center gap-2 shadow-2xl ${
                      hospital.approved ? "bg-green-500" : "bg-yellow-500"
                    }`}
                  >
                    {hospital.approved ? <FiCheckCircle /> : <FiClock />}
                    {hospital.approved ? "Approved" : "Pending"}
                  </div>
                </div>

                <div>
                  <h2 className="text-5xl font-extrabold drop-shadow-lg">
                    {hospital.hospitalName}
                  </h2>
                  <p className="text-xl mt-2 opacity-90">{hospital.city}</p>
                  <div className="mt-5">
                    <span className="bg-white/25 backdrop-blur px-6 py-3 rounded-full text-lg font-medium shadow-lg inline-flex items-center gap-3">
                      <FiMail /> {hospital.email}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setShowEditModal(true)}
                className="flex items-center gap-3 px-7 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-2xl shadow-xl cursor-pointer"
              >
                <FiEdit2 size={24} />
                Edit Profile
              </button>
            </div>
          </div>
          <div className="p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Contact Info */}
              <div className="space-y-6">
                <div className="flex items-center gap-5 p-6 bg-white/60 backdrop-blur-lg rounded-2xl border border-white/40 shadow-xl">
                  <div className="p-4 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl text-white">
                    <FiPhone size={28} />
                  </div>
                  <div>
                    <p className="text-gray-600 font-medium">Contact Number</p>
                    <p className="text-2xl font-bold text-gray-800">
                      +91 {hospital.phone}
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="flex items-center gap-5 p-6 bg-white/60 backdrop-blur-lg rounded-2xl border border-white/40 shadow-xl">
                  <div className="p-4 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl text-white">
                        <FiMapPin size={28}/>
                  </div>
                  <div>
                    <p className="text-gray-600 font-medium">Address </p>
                    <p className="text-2xl font-bold text-gray-800">
                       {hospital.address}
                    </p>
                  </div>
                </div>
              </div>

            </div>
                {hospital.vaccines && hospital.vaccines.length > 0 && (
           <div className="space-y-6 mt-10">
  <div className="p-7 bg-white/60 backdrop-blur-lg rounded-2xl border border-white/40 shadow-xl">
    <div className="flex items-center gap-5 mb-7">
      <div className="p-4 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl text-white">
        <FiShield size={28} />
      </div>
      <div>
        <p className="text-gray-600 font-semibold tracking-wide">Vaccines Available</p>
        <p className="text-3xl font-extrabold text-gray-900">
          {hospital.vaccines.length}+ Options
        </p>
      </div>
    </div>

    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {hospital.vaccines.map((vaccine, index) => (
        <div
          key={index}
          className="group flex items-center gap-3 p-4 bg-gradient-to-r from-emerald-50/80 to-teal-50/80 
                     rounded-2xl border border-emerald-200/50 
                    duration-300 cursor-pointer"
        >
          <div className="p-2 bg-white rounded-xl shadow-sm">
            <FiCheck className="w-5 h-5 text-emerald-600" />
          </div>
          <span className="font-semibold text-gray-800">{vaccine}</span>
        </div>
      ))}
    </div>
  </div>
</div>
            )}

            {/* Available Vaccines */}
          
          </div>
        </div>

        {/* EDIT PROFILE MODAL */}
        {showEditModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-200">
              {/* HEADER */}
              <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-6 flex justify-between items-center">
                <h2 className="text-3xl font-bold">Edit Hospital Profile</h2>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="text-white hover:bg-white/20 p-2 rounded-full"
                >
                  <FiX size={28} className="cursor-pointer" />
                </button>
              </div>

              {/* FORM */}
              <div className="p-8 space-y-6">
                <Formik
                  enableReinitialize
                  initialValues={{
                    hospitalName: hospital.hospitalName || "",
                    email: hospital.email || "",
                    phone: hospital.phone || "",
                    city: hospital.city || "",
                    address: hospital.address || "",
                    description: hospital.description || "",
                    vaccines: hospital.vaccines || [],
                  }}
                  validationSchema={ProfileSchema}
                  onSubmit={handleSave}
                >
                  {({ values, errors, touched, setFieldValue }) => (
                    <Form className="space-y-6">
                      {/* LOGO UPLOAD */}
                      <div className="flex items-center gap-6">
                        <div>
                          {logoFile ? (
                            <img
                              src={URL.createObjectURL(logoFile)}
                              className="w-32 h-32 rounded-full object-cover border-4 border-gray-300"
                            />
                          ) : hospital.photo ? (
                            <img
                              src={hospital.photo}
                              className="w-32 h-32 rounded-full object-cover border-4 border-gray-300"
                            />
                          ) : (
                            <div className="w-32 h-32 bg-gray-200 rounded-full border-4 border-dashed border-gray-400 flex items-center justify-center">
                              <FiHome size={50} className="text-gray-500" />
                            </div>
                          )}
                        </div>

                        <label className="cursor-pointer">
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) =>
                              e.target.files[0] &&
                              setLogoFile(e.target.files[0])
                            }
                          />
                          <div className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 flex items-center gap-2">
                            <FiUpload /> Upload Logo
                          </div>
                        </label>
                      </div>

                      {/* INPUTS */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Field
                            name="hospitalName"
                            placeholder="Hospital Name"
                            className="p-4 border text-black border-gray-300 rounded-xl w-full"
                          />
                          {errors.hospitalName && touched.hospitalName && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.hospitalName}
                            </p>
                          )}
                        </div>

                        <div>
                          <Field
                            name="email"
                            placeholder="Email"
                            className="p-4 border text-black border-gray-300 rounded-xl w-full"
                          />
                          {errors.email && touched.email && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.email}
                            </p>
                          )}
                        </div>

                        <div>
                          <Field
                            name="phone"
                            placeholder="Contact Number"
                            className="p-4 border text-black border-gray-300 rounded-xl w-full"
                          />
                          {errors.phone && touched.phone && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.phone}
                            </p>
                          )}
                        </div>

                        <div>
                          <Field
                            name="city"
                            placeholder="City"
                            className="p-4 border text-black border-gray-300 rounded-xl w-full"
                          />
                          {errors.city && touched.city && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.city}
                            </p>
                          )}
                        </div>

                        <div className="md:col-span-2">
                          <Field
                            name="address"
                            placeholder="Address"
                            className="p-4 border text-black border-gray-300 rounded-xl w-full"
                          />
                          {errors.address && touched.address && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.address}
                            </p>
                          )}
                        </div>

                        <div className="md:col-span-2">
                          <Field
                            as="textarea"
                            rows={4}
                            name="description"
                            placeholder="About / Description"
                            className="p-4 border text-black border-gray-300 rounded-xl w-full resize-none"
                          />
                          {errors.description && touched.description && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.description}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* VACCINES */}
                      <div>
                        <div className="flex gap-3 mb-4 text-black">
                          <input
                            type="text"
                            placeholder="e.g. Covishield"
                            className="flex-1 p-4 border text-black border-gray-300 rounded-xl"
                            value={vaccineInput}
                            onChange={(e) => setVaccineInput(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                const txt = vaccineInput.trim();
                                if (txt) {
                                  setFieldValue("vaccines", [
                                    ...values.vaccines,
                                    txt,
                                  ]);
                                  setVaccineInput("");
                                }
                              }
                            }}
                          />

                          <button
                            type="button"
                            className="px-6 py-4 bg-blue-600 text-white rounded-xl"
                            onClick={() => {
                              const txt = vaccineInput.trim();
                              if (txt) {
                                setFieldValue("vaccines", [
                                  ...values.vaccines,
                                  txt,
                                ]);
                                setVaccineInput("");
                              }
                            }}
                          >
                            <FiPlus size={24} className="cursor-pointer" />
                          </button>
                        </div>

                        <div className="flex flex-wrap gap-3">
                          {values.vaccines.map((v, i) => (
                            <span
                              key={i}
                              className="px-5 py-3 bg-blue-100 text-blue-700 rounded-full flex items-center gap-2"
                            >
                              {v}
                              <button
                                type="button"
                                onClick={() => {
                                  const updated = values.vaccines.filter(
                                    (_, idx) => idx !== i
                                  );
                                  setFieldValue("vaccines", updated);
                                }}
                              >
                                <FiTrash2
                                  size={16}
                                  className="cursor-pointer hover:text-red-600"
                                />
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* BUTTONS */}
                      <div className="flex justify-end gap-4 pt-6">
                        <button
                          type="button"
                          onClick={() => setShowEditModal(false)}
                          className="px-8 py-4 border text-black border-gray-300 rounded-xl"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-10 py-4 bg-blue-600 text-white font-bold rounded-xl cursor-pointer"
                          disabled={loading}
                        >
                          {loading ? "Saving..." : "Save Changes"}
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
