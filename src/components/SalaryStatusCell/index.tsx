"use client"
import { useEffect, useState } from "react";
import { Salary } from "@/payload-types";
import { updateStatus } from "./updateStatus";
import { toast } from "@payloadcms/ui";

const backgroundColor = {
  pending: {
    backgroundColor: "#F39C12",
  },
  partialApproved: {
    backgroundColor: "#54A0FF",
  },
  fullApproved: {
    backgroundColor: "#03c04a"
  },
  rejected: {
    backgroundColor: "#E74C3C"
  }
}

const generalStyle = {
  color: "white",
  padding: "4px",
  borderRadius: "5px",
  fontWeight: "bold",
  display: "inline-block",
}

type StatusType = Exclude<Salary["status"], null | undefined>;

export default function SalaryStatusCell({ cellData, rowData }: { cellData: Salary["status"], rowData: Salary }) {

  const [currentStatus, setCurrentStatus] = useState(cellData);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setCurrentStatus(cellData)
  }, [cellData])



  const handleChange = async (id: number, value: Salary["status"]) => {
    try {
      setLoading(true);
      const { success, error } = await updateStatus(id, value);
      if (success) {
        setCurrentStatus(value);
        toast.success("updated successfully");
      } else {
        toast.error("Error updating status")
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unknown Error occured");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {loading ? "updating...." :
        <select
          value={currentStatus as StatusType}
          key={rowData.id}
          onChange={(e) => handleChange(rowData.id, e.target.value as Salary["status"])}
          className="p-2 rounded border"
          style={{ ...generalStyle, ...backgroundColor[currentStatus || "pending"] }}
        >
          <option value="pending">Pending</option>
          <option value="partialApproved">Partial Approved</option>
          <option value="fullApproved">Full Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      }
    </>
  )
};