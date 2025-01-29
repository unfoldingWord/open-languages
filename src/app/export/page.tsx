import Protected from "@components/Protected";
import Table from "@components/Table";

export default async function Page() {
  return (
    <Protected>
      <Table />
    </Protected>
  );
}
