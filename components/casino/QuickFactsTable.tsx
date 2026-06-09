interface QuickFact {
  label: string;
  value: string;
}

export function QuickFactsTable({ facts }: { facts: QuickFact[] }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <table className="w-full">
        <tbody className="divide-y divide-gray-100">
          {facts.map((fact, index) => (
            <tr key={index} className="hover:bg-gray-50 transition">
              <td className="px-6 py-4 text-base font-medium text-gray-700 w-2/5">
                {fact.label}
              </td>
              <td className="px-6 py-4 text-base text-gray-900">{fact.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
