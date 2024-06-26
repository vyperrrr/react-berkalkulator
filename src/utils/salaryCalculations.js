const RATE_SZJA = 15;
const SZJA_LIMIT = 499_952;
const RATE_TB = 18.5;
const PERSONAL_TAX_ALLOWANCE = 77_300;
const ONE_CHILD_SUPPORT = 10_000;
const TWO_CHILD_SUPPORT = 20_000;
const THREE_CHILD_SUPPORT = 33_000;
const MARRIAGE_SUPPORT = 5_000;

const calculateNetSalary = (member) => {
  let salary = member.salary;
  let discounts = member.discounts;
  let totalTax = (salary * RATE_TB) / 100 + (salary * RATE_SZJA) / 100;
  let netSalary = 0;

  Object.entries(discounts).forEach(([key, value]) => {
    if (value.isActive) {
      switch (key) {
        case "UNDER_TWENTY_FIVE_DISCOUNT":
          totalTax -= salary * (RATE_SZJA / 100);
          if (salary - SZJA_LIMIT > 0)
            totalTax += (salary - SZJA_LIMIT) * (RATE_SZJA / 100);
          break;
        case "TAX_DISCOUNT":
          totalTax -= PERSONAL_TAX_ALLOWANCE;
          break;
        case "FAMILY_DISCOUNT":
          if (value.beneficiaryChildren === 0) break;
          if (value.beneficiaryChildren < 3)
            switch (value.beneficiaryChildren) {
              case 1:
                netSalary += ONE_CHILD_SUPPORT * value.supportedChildren;
                break;
              case 2:
                netSalary += TWO_CHILD_SUPPORT * value.supportedChildren;
                break;
            }
          else {
            netSalary += THREE_CHILD_SUPPORT * value.supportedChildren;
          }
          break;
        case "FRESH_MERRIED_DISCOUNT":
          if (value.isEligible) netSalary += MARRIAGE_SUPPORT;
          break;
      }
    }
  });

  if (totalTax > 0) {
    netSalary += salary - totalTax;
  } else netSalary += salary;

  return netSalary;
};

const calculateOverallNetSalary = (members) => {
  return members.reduce((sum, curr) => sum + calculateNetSalary(curr), 0);
};

export { calculateNetSalary, calculateOverallNetSalary };
