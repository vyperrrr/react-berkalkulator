import { Badge } from "@radix-ui/themes";

const Eligiblity = ({ isEligible }) => {
  return isEligible ? (
    <Badge color="green">Jogosult</Badge>
  ) : (
    <Badge color="crimson">Nem jogosult</Badge>
  );
};

export default Eligiblity;
