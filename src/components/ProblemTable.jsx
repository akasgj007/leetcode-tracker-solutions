import { useEffect, useState } from "react";
import {
  BsArrowLeftCircleFill,
  BsArrowRightCircleFill,
  BsFillTrashFill,
  BsPencilSquare,
  BsSearch,
} from "react-icons/bs";
import { FaGithub } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { difficultyLabels, statusLabels } from "../constants";

const itemsPerPage = 5;

const ProblemTable = ({ problems, handleEdit, handleDelete, isAdmin }) => {
  //Searching
  const [searchTerm, setSearchTerm] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  //useEffect
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, difficultyFilter, statusFilter]);

  const filteredProblems = problems.filter((problem) => {
    const matchesSearch =
      problem?.problemNumber
        ?.toString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      problem?.title?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDifficulty =
      difficultyFilter === "all" || problem.difficulty === difficultyFilter;

    const matchesStatus =
      statusFilter === "all" || problem.status === statusFilter;

    return matchesSearch && matchesDifficulty && matchesStatus;
  });

  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProblems = filteredProblems.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredProblems.length / itemsPerPage);

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Problem List</h2>
      <div className="d-flex justify-content-between">
        <div className="col-6">
          <label className="form-label me-2">Search:</label>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              <BsSearch />
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Search by problem number or name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="col-5 d-flex justify-content-around">
          <div className="gap-2 mb-3">
            <div>
              <label className="form-label me-2">Difficulty:</label>
              <select
                className="form-select"
                value={difficultyFilter}
                onChange={(e) => setDifficultyFilter(e.target.value)}>
                <option value="all">All</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
          </div>

          <div className=" gap-2 mb-3">
            <label className="form-label me-2">Status:</label>
            <select
              className="form-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="all">All</option>
              <option value="not-started">Not Started</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-hover table-striped">
          <thead className="table-dark">
            <tr>
              <th>Problem No.</th>
              <th>Title</th>
              <th>Difficulty</th>
              <th>Status</th>
              <th>LeetCode</th>
              <th>GitHub</th>
              {isAdmin && <th>Created On</th>}
              {isAdmin && <th>Updated On</th>}
              {isAdmin && <th>Edit</th>}
              {isAdmin && <th>Delete</th>}
            </tr>
          </thead>
          <tbody>
            {problems.length === 0 && (
              <tr>
                <td colSpan="10" className="text-center">
                  No problems found.
                </td>
              </tr>
            )}

            {paginatedProblems.length === 0 ? (
              <tr>
                <td colSpan="10" className="text-center">
                  No matching problems found.
                </td>
              </tr>
            ) : (
              paginatedProblems.map((p, index) => (
                <tr key={p.firebaseId || p.id}>
                  <td>{p.problemNumber || index + 1}</td>
                  <td>{p.title}</td>
                  <td className="text-center">
                    <span
                      className={`badge ${
                        p.difficulty === "easy"
                          ? "bg-success"
                          : p.difficulty === "medium"
                          ? "bg-warning text-dark"
                          : "bg-danger"
                      }`}>
                      {difficultyLabels[p.difficulty]}
                    </span>
                  </td>
                  <td>{statusLabels[p.status]}</td>
                  <td>
                    {p.leetcodeLink && (
                      <div className="d-flex justify-content-center align-items-center">
                        <a
                          href={p.leetcodeLink}
                          target="_blank"
                          rel="noreferrer"
                          className="text-center">
                          <SiLeetcode />
                        </a>
                      </div>
                    )}
                  </td>
                  <td>
                    {p.githubLink && (
                      <div className="d-flex justify-content-center align-items-center">
                        <a
                          href={p.githubLink}
                          target="_blank"
                          rel="noreferrer"
                          className="text-center">
                          <FaGithub />
                        </a>
                      </div>
                    )}
                  </td>
                  {isAdmin && <td>{p.createdOn}</td>}
                  {isAdmin && <td>{p.updatedOn || "-"}</td>}
                  {isAdmin && (
                    <td>
                      <div className="d-flex justify-content-center align-items-center">
                        <BsPencilSquare
                          className="text-primary"
                          style={{ cursor: "pointer" }}
                          onClick={() => handleEdit(p)}
                        />
                      </div>
                    </td>
                  )}
                  {isAdmin && (
                    <td>
                      <div className="d-flex justify-content-center align-items-center">
                        <BsFillTrashFill
                          className="text-danger"
                          style={{ cursor: "pointer" }}
                          onClick={() => handleDelete(p.id)}
                        />
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {/* Pagination controls */}
      {problems.length !== 0 && (
        <div className="d-flex justify-content-between align-items-center mt-3">
          <a className="" onClick={handlePrevious} disabled={currentPage === 1}>
            <BsArrowLeftCircleFill size={30} />
          </a>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <a
            className=""
            onClick={handleNext}
            disabled={currentPage === totalPages}>
            <BsArrowRightCircleFill size={30} />
          </a>
        </div>
      )}
      {filteredProblems.length > 0 && (
        <div className="text-center mt-2 text-muted">
          Showing {paginatedProblems.length} of {filteredProblems.length} total
          problem
          {filteredProblems.length > 1 ? "s" : ""}
        </div>
      )}
    </div>
  );
};

export default ProblemTable;
