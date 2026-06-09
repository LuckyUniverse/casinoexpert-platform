interface TocSection {
  id: string;
  title: string;
}

export function TableOfContents({ sections }: { sections: TocSection[] }) {
  return (
    <nav className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Contents</h2>
      <ol className="grid sm:grid-cols-2 gap-3 text-base">
        {sections.map((section, index) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              className="text-blue-600 hover:text-blue-700 hover:underline transition"
            >
              {index + 1}. {section.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
