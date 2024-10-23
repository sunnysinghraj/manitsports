import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {
  doc,
  setDoc,
  getDoc,
  query,
  collection,
  where,
  getDocs,
} from "firebase/firestore";
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
  const [selectedSport, setSelectedSport] = useState("");
  const [roleOptions, setRoleOptions] = useState([]);

  // Role options based on sport
  const roleMapping = {
    CRICKET: ["Batsman", "Bowler", "Allrounder", "Wicketkeeper"],
    FOOTBALL: ["Forward", "Midfielder", "Defender", "Goalkeeper"],
    BASKETBALL: [
      "Point Guard",
      "Shooting Guard",
      "Small Forward",
      "Power Forward",
      "Center",
    ],
    TENNIS: ["Player"],
    BADMINTON: ["Player"],
    VOLLEYBALL: ["Outside Hitter", "Setter", "Libero"],
    HOCKEY: ["Forward", "Defenseman", "Goalie"],
    TABLETENNIS: ["Player"], // Ensure it's in uppercase
    CHESS: ["Player"],
  };

  // Function to handle sport change
  const handleSportChange = (e) => {
    const sport = e.target.value.toUpperCase(); // Convert to uppercase for role mapping
    setSelectedSport(sport);
    setRoleOptions(roleMapping[sport] || []);
    setValue("role", ""); // Clear the selected role when sport changes
  };

  const checkExistingUser = async (email, scholarNo) => {
    const scholarDocRef = doc(fireDB, "users", scholarNo);
    const scholarDoc = await getDoc(scholarDocRef);

    if (scholarDoc.exists()) {
      return true; // Scholar number already exists
    }

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

    const confirmation = window.confirm(
      `Please confirm your details:\n\nName: ${name}\nScholar Number: ${scholarNo}\nBranch: ${branch}\nSport: ${sport}\nRole: ${role}\nEmail: ${email}\n\nDo you want to proceed with the sign-up?`
    );

    if (!confirmation) {
      toast.info("Sign-up cancelled.");
      return; // Cancel sign-up if user does not confirm
    }

    try {
      const existingUser = await checkExistingUser(email, scholarNo);
      if (existingUser) {
        toast.error("Email or Scholar Number already registered.");
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const firebaseUser = userCredential.user;

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
      navigate("/login"); // Redirect to login
    } catch (error) {
      toast.error("Failed to store user data in Firestore. Please try again.");
    }
  };

  return (
    <Layout>
      <div className="flex justify-center items-center min-h-screen my-20 ">
        <div className="signup_Form bg-slate-100 px-6 lg:px-12 py-8 border border-slate-400 rounded-xl shadow-md">
          <div className="mb-6">
            <h2 className="text-center text-3xl font-bold text-slate-600">
              Sign Up
            </h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Name Field */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Full Name"
                {...register("name", { required: "Name is required" })}
                className={`bg-slate-100 border ${
                  errors.name ? "border-red-500" : "border-slate-400"
                } px-4 py-2 w-full rounded-md outline-none placeholder-slate-400`}
                autoComplete="name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

            {/* Scholar Number Field */}
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
                })}
                onInput={(e) => {
                  const value = e.target.value.replace(/\D/g, "").slice(0, 9);
                  e.target.value = value;
                }}
                className={`bg-slate-100 border ${
                  errors.scholarNo ? "border-red-500" : "border-slate-400"
                } px-4 py-2 w-full rounded-md outline-none placeholder-slate-400`}
                autoComplete="scholarNo"
              />
              {errors.scholarNo && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.scholarNo.message}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div className="mb-4">
              <input
                type="email"
                placeholder="Email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Please enter a valid email address",
                  },
                })}
                className={`bg-slate-100 border ${
                  errors.email ? "border-red-500" : "border-slate-400"
                } px-4 py-2 w-full rounded-md outline-none placeholder-slate-400`}
                autoComplete="email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Branch Field */}
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
                <option value="MECHANICAL">MECHANICAL</option>
                <option value="CHEMICAL">CHEMICAL</option>
                <option value="CIVIL">CIVIL</option>
                <option value="MSME">MSME</option>
                <option value="PHD">PHD</option>
                <option value="MTECH">MTECH</option>
                <option value="PLANNING">PLANNING</option>
              </select>
              {errors.branch && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.branch.message}
                </p>
              )}
            </div>

            {/* Sport Field */}
            <div className="mb-4">
              <select
                {...register("sport", { required: "Sport is required" })}
                onChange={handleSportChange}
                className={`bg-slate-100 border ${
                  errors.sport ? "border-red-500" : "border-slate-400"
                } px-4 py-2 w-full rounded-md outline-none`}
              >
                <option value="">Select Sport</option>
                <option value="Cricket">Cricket</option>
                <option value="Football">Football</option>
                <option value="Basketball">Basketball</option>
                <option value="Tennis">Tennis</option>
                <option value="Badminton">Badminton</option>
                <option value="Volleyball">Volleyball</option>
                <option value="Hockey">Hockey</option>
                <option value="TableTennis">Table Tennis</option>
                <option value="Chess">Chess</option>
              </select>
              {errors.sport && (
                <p className="text-red-500 text-sm mt-1">{errors.sport.message}</p>
              )}
            </div>

            {/* Role Field */}
            {selectedSport && (
              <div className="mb-4">
                <select
                  {...register("role", { required: "Role is required" })}
                  className={`bg-slate-100 border ${
                    errors.role ? "border-red-500" : "border-slate-400"
                  } px-4 py-2 w-full rounded-md outline-none`}
                >
                  <option value="">Select Role</option>
                  {roleOptions.map((role, index) => (
                    <option key={index} value={role}>
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
            )}

            {/* Password Field */}
            <div className="mb-4 relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters long",
                  },
                })}
                className={`bg-slate-100 border ${
                  errors.password ? "border-red-500" : "border-slate-400"
                } px-4 py-2 w-full rounded-md outline-none placeholder-slate-400`}
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-slate-400"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="mb-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-slate-600 text-white px-4 py-2 w-full rounded-md hover:bg-slate-700 transition duration-200 disabled:bg-gray-400"
              >
                {isSubmitting ? "Signing Up..." : "Sign Up"}
              </button>
            </div>
          </form>

          <div className="text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Signup;
