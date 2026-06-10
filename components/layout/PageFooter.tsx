"use client";

import { usePathname } from "next/navigation";
import { ImportantInformation } from "./ImportantInformation";
import { OntarioImportantInformation } from "./OntarioImportantInformation";
import { ComplianceFooter } from "../casino/ComplianceFooter";
import { OntarioComplianceFooter } from "../casino/OntarioComplianceFooter";

/**
 * Page footer — picks the Ontario-flavoured pair (19+, ConnexOntario,
 * Gamblers Anonymous) on /casinos/ontario, default pair elsewhere
 * (19+, GamCare, Gamblers Anonymous).
 */
export function PageFooter() {
  const pathname = usePathname();
  const isOntario = pathname === "/casinos/ontario";

  return (
    <div className="container mx-auto px-4 max-w-7xl">
      {isOntario ? <OntarioImportantInformation /> : <ImportantInformation />}
      {isOntario ? <OntarioComplianceFooter /> : <ComplianceFooter />}
    </div>
  );
}
