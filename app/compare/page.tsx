"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useMemo } from "react";
import { allCasinosInOrder } from "@/lib/casino-data";
import { hasBrandLogo, brandLogoSrc } from "@/lib/brand-logos";

/**
 * /compare - interactive side-by-side comparison of up to 3 brands.
 * Scoped to the 13 brands in our Canada coverage (Ontario sister
 * versions intentionally excluded).
 */

// The set of Quick Facts fields we display in the comparison grid,
// in the order they should appear. Labels match the brand review pages.
const FIELDS: string[] = [
  "Operator",
  "Licence",
  "Online since",
  "Software",
  "Welcome offer",
  "Wagering requirement",
  "Minimum deposit",
  "Withdrawal timing",
  "CAD support",
  "Mobile",
  "Live chat",
  "Formal ADR",
];

function valueFor(brandSlug: string | null, fieldLabel: string): string {
  if (!brandSlug) return "-";
  const brand = allCasinosInOrder().find((b) => b.slug === brandSlug);
  if (!brand) return "-";
  const fact = brand.quickFacts.find((f) => f.label === fieldLabel);
  return fact?.value ?? "-";
}

export default function ComparePage() {
  const brands = useMemo(() => allCasinosInOrder(), []);
  const [slot1, setSlot1] = useState<string | null>("jackpot-city");
  const [slot2, setSlot2] = useState<string | null>("betway-casino");
  const [slot3, setSlot3] = useState<string | null>(null);

  const slots: Array<[string | null, (s: string | null) => void]> = [
    [slot1, setSlot1],
    [slot2, setSlot2],
    [slot3, setSlot3],
  ];

  const selectedCount = slots.filter(([s]) => s).length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-8">
          <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-2">
            Side-by-side comparison
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Compare Canadian online casinos
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl leading-relaxed">
            Pick up to three of the thirteen brands we cover and compare them on operator,
            licence, welcome offer, banking, support and trust signals - all in one view.
          </p>
        </header>

        {/* Selector row */}
        <section className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          {slots.map(([selected, setter], idx) => (
            <div key={idx} className="bg-white border border-gray-200 rounded-xl p-4">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">
                Brand {idx + 1}
                {idx > 1 && " (optional)"}
              </label>
              <select
                value={selected ?? ""}
                onChange={(e) => setter(e.target.value || null)}
                className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Pick a brand</option>
                {brands.map((b) => (
                  <option key={b.slug} value={b.slug}>
                    {b.name}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </section>

        {/* Comparison grid */}
        {selectedCount === 0 ? (
          <div className="bg-white border border-gray-200 rounded-xl p-12 text-center text-gray-500">
            Pick at least one brand above to see the comparison.
          </div>
        ) : (
          <section className="overflow-x-auto bg-white border border-gray-200 rounded-xl">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-5 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider w-44">
                    Brand
                  </th>
                  {slots.map(([slug], idx) => {
                    const brand = slug ? brands.find((b) => b.slug === slug) : null;
                    return (
                      <th
                        key={idx}
                        className="px-5 py-4 text-left border-l border-gray-200 min-w-[220px]"
                      >
                        {brand ? (
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              {hasBrandLogo(brand.slug) && (
                                <div className="w-10 h-10 rounded-lg bg-white border border-gray-200 shadow-sm flex items-center justify-center overflow-hidden flex-shrink-0">
                                  <Image
                                    src={brandLogoSrc(brand.slug)}
                                    alt={`${brand.name} logo`}
                                    width={40}
                                    height={40}
                                    className="w-full h-full object-contain p-1"
                                  />
                                </div>
                              )}
                              <Link
                                href={`/casinos/${brand.slug}`}
                                className="text-base font-bold text-gray-900 hover:text-blue-600"
                              >
                                {brand.name}
                              </Link>
                            </div>
                            {brand.expertVerdict && (
                              <p className="text-xs text-gray-600 italic leading-snug normal-case font-normal">
                                {brand.expertVerdict}
                              </p>
                            )}
                          </div>
                        ) : (
                          <span className="text-xs text-gray-400 normal-case font-normal">
                            (not selected)
                          </span>
                        )}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {FIELDS.map((field, fi) => (
                  <tr
                    key={field}
                    className={fi % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="px-5 py-3 text-gray-700 font-medium align-top">
                      {field}
                    </td>
                    {slots.map(([slug], idx) => (
                      <td
                        key={idx}
                        className="px-5 py-3 text-gray-900 border-l border-gray-200 align-top"
                      >
                        {slug ? valueFor(slug, field) : <span className="text-gray-300">-</span>}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

        {/* Footnote */}
        <p className="text-xs text-gray-500 mt-6 leading-relaxed max-w-3xl">
          This compare tool covers the thirteen brands on casinoexpert.ai. Pick any
          two or three above to see them side-by-side.
        </p>
      </div>
    </div>
  );
}
