import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import ProblemForm from "../components/ProblemForm";
import ProblemTable from "../components/ProblemTable";
import { db } from "../firebase";

function AdminPage() {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProblem, setEditingProblem] = useState(null);

  // 🔄 Fetch problems from Firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "problems"), orderBy("problemNumber", "asc")),
      (snapshot) => {
        console.log("🔥 Snapshot received");
        const problemsList = snapshot.docs.map((doc) => ({
          ...doc.data(),
          firebaseId: doc.id,
        }));
        setProblems(problemsList);
        setLoading(false); // only runs if snapshot triggers
      },
      (error) => {
        console.error("❌ Firestore error:", error);
        setLoading(false); // avoid infinite loader
      }
    );

    return () => unsubscribe();
  }, []);

  // ➕ Add / ✏️ Update problem
  const handleSubmit = async (problemInput) => {
    const timestamp = new Date().toLocaleString();
    // 🔁 Ensure problemNumber is a number
    const sanitizedInput = {
      ...problemInput,
      problemNumber: Number(problemInput.problemNumber),
    };

    if (editingProblem) {
      // Update existing
      const updated = {
        ...editingProblem,
        ...sanitizedInput,
        updatedOn: timestamp,
      };

      await updateDoc(doc(db, "problems", editingProblem.firebaseId), updated);
      setEditingProblem(null);
    } else {
      // Add new
      const newProblem = {
        ...problemInput,
        id: Date.now(),
        createdOn: timestamp,
        updatedOn: "",
      };

      const docRef = await addDoc(collection(db, "problems"), newProblem);
      newProblem.firebaseId = docRef.id;
    }
  };

  // 🗑️ Delete problem
  const handleDelete = async (id) => {
    const toDelete = problems.find((p) => p.id === id);
    if (toDelete?.firebaseId) {
      await deleteDoc(doc(db, "problems", toDelete.firebaseId));
    }
  };

  // ✏️ Start editing
  const handleEdit = (problem) => {
    setEditingProblem(problem);
  };

  // ❌ Cancel editing
  const clearEditing = () => {
    setEditingProblem(null);
  };

  return (
    <div className="container-fluid mt-5 px-4">
      <h2 className="text-center mb-4">Leetcode Tracker</h2>
      {loading ? (
        <Loader></Loader>
      ) : (
        <div className="row">
          {/* Table on left */}
          <div className="col-lg-9 col-md-8 col-12 mb-4">
            <ProblemTable
              problems={problems}
              isAdmin={true}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          </div>

          {/* Form on right */}
          <div className="col-lg-3 col-md-4 col-12">
            <div className="position-sticky" style={{ top: "80px" }}>
              <ProblemForm
                onSubmit={handleSubmit}
                editingProblem={editingProblem}
                clearEditing={clearEditing}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminPage;
