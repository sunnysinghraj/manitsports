import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { fireDB } from "../../firebase/FirebaseConfig";
import Layout from "../layout/Layout";

const branchOrder = [
  "CSE",
  "ECE",
  "EEE",
  "MECHANICAL",
  "CHEMICAL",
  "CIVIL",
  "MSME",
  "PHD",
  "MTECH",
  "PLANNING",
];

const StudentDetails = () => {
  const { sportName } = useParams();
  const [studentsByBranch, setStudentsByBranch] = useState({});
  const [selectedBranch, setSelectedBranch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const q = query(collection(fireDB, "users"), where("sport", "==", sportName));
      const querySnapshot = await getDocs(q);
      let studentArray = [];
      querySnapshot.forEach((doc) => {
        studentArray.push({ ...doc.data(), id: doc.id });
      });

      console.log("Fetched Students:", studentArray); // Log fetched students

      const studentsGrouped = {};
      studentArray.forEach((student) => {
        const branch = student.branch;
        if (!studentsGrouped[branch]) {
          studentsGrouped[branch] = [];
        }
        studentsGrouped[branch].push(student);
      });

      console.log("Students Grouped by Branch:", studentsGrouped); // Log grouped students

      // Sort students in each branch by scholar number
      Object.keys(studentsGrouped).forEach(branch => {
        studentsGrouped[branch].sort((a, b) => a.scholarNo.localeCompare(b.scholarNo));
      });

      setStudentsByBranch(studentsGrouped);
    } catch (error) {
      setError('Failed to fetch students. Please try again later.');
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [sportName]);

  const handleBranchChange = (event) => {
    setSelectedBranch(event.target.value);
  };

  return (
    <Layout>
      <div className="my-10">
        <div className="container mx-auto">
          <div className="flex justify-center mb-3">
            <div className="w-1/6">
              <label htmlFor="branch-select" className="block mb-1 text-lg font-bold text-center">
                Select Branch:
              </label>
              <select
                id="branch-select"
                value={selectedBranch}
                onChange={handleBranchChange}
                className="bg-slate-100 border border-slate-400 px-2 py-1 rounded-md outline-none w-full"
              >
                <option value="">Select a branch</option>
                {branchOrder.map((branch) => (
                  <option key={branch} value={branch}>
                    {branch}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {loading && <p className="text-center">Loading...</p>}
          {error && <p className="text-red-500 text-center">{error}</p>}

          {selectedBranch && !loading && (
            <div>
              <h1 className="text-center text-2xl font-bold mb-3 text-white bg-slate-500 rounded-xl py-1">
                {selectedBranch}
              </h1>
              {studentsByBranch[selectedBranch]?.length > 0 ? (
                <table className="table-auto w-full text-left border-collapse mb-5">
                  <thead>
                    <tr>
                      <th className="border-b px-2 py-1 text-center">S. No</th>
                      <th className="border-b px-2 py-1">Scholar No</th>
                      <th className="border-b px-2 py-1">Name</th>
                      <th className="border-b px-2 py-1">Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {studentsByBranch[selectedBranch].map((student, index) => (
                      <tr key={student.id} className="hover:bg-slate-200">
                        <td className="border-t px-2 py-1 text-center">{index + 1}</td>
                        <td className="border-t px-2 py-1">{student.scholarNo}</td>
                        <td className="border-t px-2 py-1">{student.name}</td>
                        <td className="border-t px-2 py-1">{student.role}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-center mb-5">No players registered yet.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default StudentDetails;
