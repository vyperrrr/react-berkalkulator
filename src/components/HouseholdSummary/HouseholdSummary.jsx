import { Box, Heading, Table } from "@radix-ui/themes";

import MemberContext from "../../store/MemberContext";
import formatCurrency from "../../utils/numberFormatter";
import { useContext } from "react";

const HouseholdSummary = () => {
  const { members, calculateNetSalary, calculateOverallNetSalary } =
    useContext(MemberContext);

  return (
    <Box className="h-full w-full space-y-2">
      <Heading size="3" className="text-center uppercase">
        Háztartás összesített jövedelme
      </Heading>
      <Table.Root variant="surface">
        <Table.Header className="[&>*]:font-extrabold">
          <Table.Row>
            <Table.Cell>Családtag</Table.Cell>
            <Table.Cell>Nettó bér</Table.Cell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {members.map((member) => (
            <Table.Row key={member.id}>
              <Table.RowHeaderCell>
                {member.name === "" ? `Placeholder #${member.id}` : member.name}
              </Table.RowHeaderCell>
              <Table.Cell>
                {formatCurrency(calculateNetSalary(member))}
              </Table.Cell>
            </Table.Row>
          ))}
          <Table.Row>
            <Table.RowHeaderCell className="font-semibold">
              Összesen
            </Table.RowHeaderCell>
            <Table.Cell>
              {formatCurrency(calculateOverallNetSalary())}
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>
    </Box>
  );
};

export default HouseholdSummary;
