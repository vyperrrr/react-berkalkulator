import { Box, Heading, Table } from "@radix-ui/themes";

import MemberContext from "@/store/MemberContext";
import { useContext } from "react";

import formatName from "@/utils/nameFormatter";
import formatCurrency from "@/utils/numberFormatter";
import {
  calculateNetSalary,
  calculateOverallNetSalary,
} from "@/utils/salaryCalculations";

const HouseholdSummary = () => {
  const { members, selectedMember } = useContext(MemberContext);

  const overallNetSalary = formatCurrency(calculateOverallNetSalary(members));

  return (
    <Box className="h-full w-full space-y-3">
      <Heading size="4" className="text-center uppercase">
        Háztartás összesített jövedelme
      </Heading>
      <Table.Root variant="surface" className="border-0">
        <Table.Header className="[&>*]:font-semibold">
          <Table.Row>
            <Table.Cell>Családtag</Table.Cell>
            <Table.Cell>Nettó bér</Table.Cell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {members.map((member) => (
            <Table.Row
              key={member.id}
              className={
                member.id === selectedMember.id &&
                "text-[color:var(--accent-contrast)] [&>*]:bg-[color:var(--accent-9)]"
              }
            >
              <Table.RowHeaderCell>{formatName(member)}</Table.RowHeaderCell>
              <Table.Cell>
                {formatCurrency(calculateNetSalary(member))}
              </Table.Cell>
            </Table.Row>
          ))}
          <Table.Row>
            <Table.RowHeaderCell>Összesen</Table.RowHeaderCell>
            <Table.Cell>{overallNetSalary}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>
    </Box>
  );
};

export default HouseholdSummary;
