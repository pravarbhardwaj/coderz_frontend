import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Modal,
  Box,
  TextField,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import dayjs from "dayjs";
import { getAPI, patchAPI } from "../../../request/APIManager";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const ProjectReview = () => {
  const [submissions, setSubmissions] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [count, setCount] = useState(0);
  const [pendingOnly, setPendingOnly] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);
  const [prefilled, setPrefilled] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const navigation = useNavigate();

  const fetchSubmissions = async () => {
    try {
      let url = `/projects/project-submission/list/?page=${
        pageNumber === 0 ? 1 : pageNumber
      }&pending=${pendingOnly}`;

      const res = await getAPI(navigation, url);
      setSubmissions(res.results);
      setTotalPages(res.total_pages);

      setPageNumber(res.total_pages == 0 ? 0 : 1);

      setCount(res.count);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, [pageNumber, pendingOnly]);

  const handleRowClick = (submission) => {
    setSelectedSubmission(submission);
    setPrefilled(submission.teacher_evaluation ? true : false);
    setFeedback(submission.teacher_evaluation || "");
    setOpenModal(true);
  };

  const handleSubmit = async () => {
    if (!feedback.trim()) {
      alert("Feedback is required.");
      return;
    }
    try {
      await patchAPI(
        navigation,
        `/projects/project-submission/${selectedSubmission.id}/evaluation/`,
        { teacher_evaluation: feedback }
      );
      setOpenModal(false);
      alert("Feedback Submitted!");
      fetchSubmissions();
    } catch (err) {
      console.error(err);
    }
  };

  const handlePageChange = (newPage) => {
    setPageNumber(newPage);
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center gap-4">
        <FormControlLabel
          control={
            <Checkbox
              checked={pendingOnly}
              onChange={(e) => {
                setPendingOnly(e.target.checked);
                setSearchParams({ page: 1, pending: e.target.checked });
              }}
            />
          }
          label="Show only pending"
        />
      </div>

      <TableContainer component={Paper}>
        <Table className="min-w-full" aria-label="submissions table">
          <TableHead className="bg-gray-100">
            <TableRow>
              <TableCell>Student</TableCell>
              <TableCell>Student Name</TableCell>
              <TableCell>Submitted At</TableCell>
              <TableCell>Reviewed</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {submissions.map((submission) => (
              <TableRow
                key={submission.id}
                hover
                className="cursor-pointer"
                onClick={() => handleRowClick(submission)}
              >
                <TableCell>{submission.student}</TableCell>
                <TableCell>{submission.student_name}</TableCell>
                <TableCell>
                  {dayjs(submission.submitted_at).format("DD-MM-YYYY")}
                </TableCell>
                <TableCell>
                  {submission.teacher_evaluation ? "True" : "False"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div className="flex justify-between items-center pt-4">
        <Button
          variant="contained"
          disabled={pageNumber <= 1}
          onClick={() => handlePageChange(pageNumber - 1)}
        >
          Previous
        </Button>
        <span className="text-gray-700">
          Page {pageNumber} / {totalPages}
        </span>
        <Button
          variant="contained"
          disabled={submissions.length === 0 || totalPages === pageNumber}
          onClick={() => handlePageChange(pageNumber + 1)}
        >
          Next
        </Button>
      </div>

      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box sx={style}>
          <h2 className="text-lg font-semibold mb-4">Submission Details</h2>
          <Button
            variant="outlined"
            fullWidth
            className="mb-4"
            href={selectedSubmission?.submission_file}
            target="_blank"
            rel="noopener noreferrer"
          >
            View Submission File
          </Button>
          <div className="mt-10">
            <TextField
              label="Feedback"
              multiline
              required
              fullWidth
              rows={4}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              disabled={prefilled}
            />
          </div>
          <div className="flex justify-end mt-4 gap-2">
            <Button
              disabled={prefilled}
              variant="contained"
              color="primary"
              onClick={handleSubmit}
            >
              Submit
            </Button>
            <Button variant="outlined" onClick={() => setOpenModal(false)}>
              Cancel
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default ProjectReview;
