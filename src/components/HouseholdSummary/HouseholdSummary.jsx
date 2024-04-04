import { Box, Heading, Table } from "@radix-ui/themes";

import MemberContext from "../../store/MemberContext";
import { useContext } from "react";

const HouseholdSummary = () => {
  const { members, calculateNetSalary, calculateOverallNetSalary } =
    useContext(MemberContext);

  return (
    <Box className="space-y-2">
      <Heading size="3" className="text-center">
        Háztartás összesített jövedelme
      </Heading>
      <Table.Root variant="surface">
        <Table.Header className="[&>*]:font-semibold">
          <Table.Row>
            <Table.Cell>Családtag</Table.Cell>
            <Table.Cell>Nettó bér</Table.Cell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {members.map((member) => (
            <Table.Row>
              <Table.Cell>{member.name}</Table.Cell>
              <Table.Cell>{calculateNetSalary(member)} Ft</Table.Cell>
            </Table.Row>
          ))}
          <Table.Row>
            <Table.RowHeaderCell>Összesen</Table.RowHeaderCell>
            <Table.Cell>{calculateOverallNetSalary()} Ft</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>
    </Box>
  );
};

export default HouseholdSummary;
