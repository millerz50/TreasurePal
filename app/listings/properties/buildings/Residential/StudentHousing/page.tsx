import StudentClient from "./StudentClient";

export default function Page() {
  return (
    <StudentClient
      title="Student Housing"
      subtitle="Find student-friendly properties near your campus."
      endpoint="student"
    />
  );
}
