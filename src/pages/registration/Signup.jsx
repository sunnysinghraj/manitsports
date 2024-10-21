import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { auth, fireDB } from "../../firebase/FirebaseConfig"; // Adjust the path as needed
import { createUserWithEmailAndPassword } from "firebase/auth";
import {
  doc,
  setDoc,
  getDoc,
  query,
  collection,
  where,
  getDocs,
} from "firebase/firestore"; // Import Firestore functions
import toast from "react-hot-toast";
import Layout from "../../components/layout/Layout";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [selectedSport, setSelectedSport] = useState(""); // Track selected sport
  const [roleOptions, setRoleOptions] = useState([]); // Track dynamic role options

  // Role options based on sport
  const roleMapping = {
    CRICKET: ["Batsman", "Bowler", "Allrounder", "Wicketkeeper"],
    FOOTBALL: ["Forward", "Midfielder", "Defender", "Goalkeeper"],
    BASKETBALL: ["Point Guard", "Shooting Guard", "Small Forward", "Power Forward", "Center"],
    TENNIS: ["Singles Player", "Doubles Player"],
    BADMINTON: ["Singles Player", "Doubles Player"],
    VOLLEYBALL: ["Outside Hitter", "Setter", "Libero"],
    HOCKEY: ["Forward", "Defenseman", "Goalie"],
    TABLE_TENNIS: ["Singles Player", "Doubles Player"],
    CHESS: ["Player"],
  };

  // Function to handle sport change
  const handleSportChange = (e) => {
    const sport = e.target.value;
    setSelectedSport(sport);
    setRoleOptions(roleMapping[sport] || []);
    setValue("role", ""); // Clear the selected role when sport changes
  };

  // Check if scholar number or email is already registered
  const checkExistingUser = async (email, scholarNo) => {
    // Check if scholar number already exists
    const scholarDocRef = doc(fireDB, "users", scholarNo);
    const scholarDoc = await getDoc(scholarDocRef);

    if (scholarDoc.exists()) {
      return true; // Scholar number already exists
    }

    // Check for email existence by querying Firestore
    const emailQuery = query(
      collection(fireDB, "users"),
      where("email", "==", email)
    );
    const querySnapshot = await getDocs(emailQuery);
    if (!querySnapshot.empty) {
      return true; // Email already exists
    }

    return false; // Neither scholar number nor email exists
  };

  const onSubmit = async (data) => {
    const { name, scholarNo, branch, sport, role, email, password } = data;

    // Show confirmation dialog
    const confirmation = window.confirm(
      `Please confirm your details:\n\nName: ${name}\nScholar Number: ${scholarNo}\nBranch: ${branch}\nSport: ${sport}\nRole: ${role}\nEmail: ${email}\n\nDo you want to proceed with the sign-up?`
    );

    if (!confirmation) {
      toast.info("Sign-up cancelled.");
      return; // Cancel sign-up if user does not confirm
    }

    try {
      // Check if scholar number or email already exists
      const existingUser = await checkExistingUser(email, scholarNo);
      if (existingUser) {
        toast.error("Email or Scholar Number already registered.");
        return;
      }

      // Firebase Authentication: Create User with Email and Password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const firebaseUser = userCredential.user;

      // Firestore: Store additional user details
      await setDoc(doc(fireDB, "users", scholarNo), {
        uid: firebaseUser.uid,
        name,
        scholarNo,
        branch,
        sport,
        role,
        email,
        work: "User",
        createdAt: new Date(),
      });
      toast.success("Signup successful!");
      navigate("/login"); // Redirect to dashboard or desired route
    } catch (error) {
      console.error("Error writing to Firestore:", error);
      toast.error("Failed to store user data in Firestore. Please try again.");
    }
  };

  return (
    <Layout>
      <div className="flex justify-center items-center min-h-screen my-20 ">
        <div className="signup_Form bg-slate-100 px-6 lg:px-12 py-8 border border-slate-400 rounded-xl shadow-md">
          {/* Heading */}
          <div className="mb-6">
            <h2 className="text-center text-3xl font-bold text-slate-600">
              Sign Up
            </h2>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Name Input */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Full Name"
                {...register("name", { required: "Name is required" })}
                className={`bg-slate-100 border ${
                  errors.name ? "border-red-500" : "border-slate-400"
                } px-4 py-2 w-full rounded-md outline-none placeholder-slate-400`}
                autoComplete="name" // Added autocomplete attribute
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Scholar Number Input */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Scholar Number (9 digits)"
                {...register("scholarNo", {
                  required: "Scholar Number is required",
                  pattern: {
                    value: /^\d{9}$/,
                    message: "Scholar Number must be exactly 9 digits",
                  },
                  maxLength: {
                    value: 9,
                    message: "Scholar Number cannot exceed 9 digits",
                  },
                  validate: (value) => value.length === 9 || "Scholar Number must be exactly 9 digits",
                })}
                onInput={(e) => {
                  const value = e.target.value.replace(/\D/g, '').slice(0, 9);
                  e.target.value = value;
                }} // Restrict input to 9 digits
                className={`bg-slate-100 border ${
                  errors.scholarNo ? "border-red-500" : "border-slate-400"
                } px-4 py-2 w-full rounded-md outline-none placeholder-slate-400`}
                autoComplete="scholarNo" // Added autocomplete attribute
              />
              {errors.scholarNo && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.scholarNo.message}
                </p>
              )}
            </div>

            {/* Branch Dropdown */}
            <div className="mb-4">
              <select
                {...register("branch", { required: "Branch is required" })}
                className={`bg-slate-100 border ${
                  errors.branch ? "border-red-500" : "border-slate-400"
                } px-4 py-2 w-full rounded-md outline-none`}
              >
                <option value="">Select Branch</option>
                <option value="CSE">CSE</option>
                <option value="ECE">ECE</option>
                <option value="EEE">EEE</option>
                <option value="ME">ME</option>
                <option value="CE">CE</option>
                <option value="CHE">CHE</option>
                <option value="MCE">MCE</option>
              </select>
              {errors.branch && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.branch.message}
                </p>
              )}
            </div>

            {/* Sport Dropdown */}
            <div className="mb-4">
              <select
                {...register("sport", { required: "Sport is required" })}
                onChange={handleSportChange} // Handle sport change
                className={`bg-slate-100 border ${
                  errors.sport ? "border-red-500" : "border-slate-400"
                } px-4 py-2 w-full rounded-md outline-none`}
              >
                <option value="">Select Sport</option>
                <option value="CRICKET">CRICKET</option>
                <option value="FOOTBALL">FOOTBALL</option>
                <option value="BASKETBALL">BASKETBALL</option>
                <option value="TENNIS">TENNIS</option>
                <option value="BADMINTON">BADMINTON</option>
                <option value="VOLLEYBALL">VOLLEYBALL</option>
                <option value="HOCKEY">HOCKEY</option>
                <option value="TABLE_TENNIS">TABLE TENNIS</option>
                <option value="CHESS">CHESS</option>
              </select>
              {errors.sport && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.sport.message}
                </p>
              )}
            </div>

            {/* Role Dropdown */}
            <div className="mb-4">
              <select
                {...register("role", { required: "Role is required" })}
                disabled={roleOptions.length === 0} // Disable if no options are available
                className={`bg-slate-100 border ${
                  errors.role ? "border-red-500" : "border-slate-400"
                } px-4 py-2 w-full rounded-md outline-none`}
              >
                <option value="">Select Role</option>
                {roleOptions.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
              {errors.role && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.role.message}
                </p>
              )}
            </div>

            {/* Email Input */}
            <div className="mb-4">
              <input
                type="email"
                placeholder="Email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email address",
                  },
                })}
                className={`bg-slate-100 border ${
                  errors.email ? "border-red-500" : "border-slate-400"
                } px-4 py-2 w-full rounded-md outline-none placeholder-slate-400`}
                autoComplete="email" // Added autocomplete attribute
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Input */}
            <div className="mb-4">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className={`bg-slate-100 border ${
                  errors.password ? "border-red-500" : "border-slate-400"
                } px-4 py-2 w-full rounded-md outline-none placeholder-slate-400`}
              />
              <div className="flex items-center mt-2">
                <input
                  type="checkbox"
                  id="show-password"
                  checked={showPassword}
                  onChange={() => setShowPassword((prev) => !prev)}
                  className="mr-2"
                />
                <label htmlFor="show-password" className="text-gray-700">
                  Show Password
                </label>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Sign Up Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-slate-600 text-white px-4 py-2 rounded-md w-full hover:bg-slate-800 transition-colors"
            >
              {isSubmitting ? "Signing Up..." : "Sign Up"}
            </button>
          </form>

          {/* Redirect to Login */}
          <p className="text-center mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Signup;
