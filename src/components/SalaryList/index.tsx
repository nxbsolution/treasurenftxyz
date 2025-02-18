import { Button } from "@payloadcms/ui";
import Link from "next/link";

interface ContributionListProps {
  searchParams: { [key: string]: string };
}

const STATUS_OPTIONS = [
  { value: 'pending', label: 'Pending' },
  { value: 'partialApproved', label: 'Partial Approved' },
  { value: 'fullApproved', label: 'Full Approved' },
  { value: 'rejected', label: 'Rejected' },
];

export default function SalaryList({ searchParams }: ContributionListProps) {
  const createQueryString = (value: string) => {

    const params = new URLSearchParams();
    params.set("where[or][0][and][0][status][equals]", value);

    return params.toString();
  };

  const isActive = (value: string) => searchParams["where[or][0][and][0][status][equals]"] === value

  return (
    <div style={{ display: "flex", flex: "wrap", gap: "0.5rem" }}>
      <Link href="?">
        <Button
          buttonStyle={!searchParams["where[or][0][and][0][status][equals]"] ? "primary" : "pill"}
        >
          All
        </Button>
      </Link>

      {
        STATUS_OPTIONS.map(({ value, label }) => (
          <Link key={value} href={`?${createQueryString(value)}`}>
            <Button
              buttonStyle={isActive(value) ? "primary" : "pill"}
            >
              {label}
            </Button>
          </Link>
        ))
      }

    </div>
  );
}
