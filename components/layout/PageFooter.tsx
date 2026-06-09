import { ImportantInformation } from "./ImportantInformation";
import { ComplianceFooter } from "../casino/ComplianceFooter";

export function PageFooter() {
  return (
    <div className="container mx-auto px-4 max-w-7xl">
      <ImportantInformation />
      <ComplianceFooter />
    </div>
  );
}
