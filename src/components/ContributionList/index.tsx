import { Button } from "@payloadcms/ui";
import Link from "next/link";

interface ContributionListProps {
  searchParams: { [key: string]: string };
}

const STAR_OPTIONS = [1, 2, 3, 4, 5, 6].map(num => ({
  value: `${num}star`,
  label: `Star ${num}`
}));

const VERIFY_OPTIONS = [
  { value: 'PENDING', label: 'Pending' },
  { value: 'REJECTED', label: 'Rejected' },
  { value: 'APPROVED', label: 'Approved' }
];

export default function ContributionList({ searchParams }: ContributionListProps) {
  const createQueryString = (type: 'star' | 'verify', value: string) => {
    // Create new URLSearchParams instance each time
    const params = new URLSearchParams();
    const queryMap = {
      star: "where[or][0][and][0][star][equals]",
      verify: "where[or][1][and][0][verify][equals]"
    };
    params.set(queryMap[type], value);
    return params.toString();
  };

  const isActive = (type: 'star' | 'verify', value: string) => {
    const queryMap = {
      star: "where[or][0][and][0][star][equals]",
      verify: "where[or][1][and][0][verify][equals]"
    };
    return searchParams[queryMap[type]] === value;
  };

  return (
    <div style={{ display: "flex", flex: "wrap", gap: "0.5rem" }}>
      <Link href="?">
        <Button
          buttonStyle={!searchParams["where[or][0][and][0][star][equals]"] &&
            !searchParams["where[or][1][and][0][verify][equals]"]
            ? "primary" : "pill"}
        >
          All
        </Button>
      </Link>

      {
        STAR_OPTIONS.map(({ value, label }) => (
          <Link key={value} href={`?${createQueryString('star', value)}`}>
            <Button
              buttonStyle={isActive('star', value) ? "primary" : "pill"}
            >
              {label}
            </Button>
          </Link>
        ))
      }

      {
        VERIFY_OPTIONS.map(({ value, label }) => (
          <Link key={value} href={`?${createQueryString('verify', value)}`}>
            <Button
              buttonStyle={isActive('verify', value) ? "primary" : "pill"}
            >
              {label}
            </Button>
          </Link>
        ))
      }
    </div>
  );
}
