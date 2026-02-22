import { StyleSheet } from '@react-pdf/renderer';

// Brand palette (mirrors Tailwind colors used in app)
export const COLORS = {
  blue: '#3B82F6',       // blue-500 (brand)
  blueDark: '#1D4ED8',   // blue-700
  blueLight: '#EFF6FF',  // blue-50
  green: '#16A34A',      // green-600
  greenLight: '#F0FDF4', // green-50
  red: '#DC2626',        // red-600
  redLight: '#FEF2F2',   // red-50
  purple: '#7C3AED',     // purple-600
  amber: '#D97706',      // amber-600
  text: '#1F2937',       // gray-800
  textMed: '#374151',    // gray-700
  textLight: '#6B7280',  // gray-500
  border: '#E5E7EB',     // gray-200
  bg: '#F9FAFB',         // gray-50
  white: '#FFFFFF',
};

export const styles = StyleSheet.create({
  // ── Page ────────────────────────────────────────────────────────────────
  page: {
    fontFamily: 'Helvetica',
    fontSize: 9,
    color: COLORS.text,
    paddingTop: 36,
    paddingBottom: 44,
    paddingHorizontal: 36,
  },

  // ── Page header / footer ────────────────────────────────────────────────
  pageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.blue,
    marginHorizontal: -36,
    marginTop: -36,
    paddingHorizontal: 36,
    paddingVertical: 10,
    marginBottom: 20,
  },
  pageHeaderLogo: {
    fontSize: 13,
    fontFamily: 'Helvetica-Bold',
    color: COLORS.white,
  },
  pageHeaderRight: {
    fontSize: 8,
    color: 'rgba(255,255,255,0.85)',
    textAlign: 'right',
  },
  pageFooter: {
    position: 'absolute',
    bottom: 16,
    left: 36,
    right: 36,
    fontSize: 7,
    color: COLORS.textLight,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  // ── Small page header (non-cover pages) ─────────────────────────────────
  sectionPageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.blue,
    paddingBottom: 6,
    marginBottom: 16,
  },
  sectionPageTitle: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: COLORS.blue,
  },
  sectionPageMeta: {
    fontSize: 7,
    color: COLORS.textLight,
  },

  // ── Section headings ────────────────────────────────────────────────────
  sectionTitle: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: COLORS.blue,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingBottom: 3,
    marginBottom: 8,
    marginTop: 12,
  },
  subsectionTitle: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: COLORS.textMed,
    marginBottom: 4,
    marginTop: 8,
  },

  // ── Cover page specifics ────────────────────────────────────────────────
  coverHero: {
    backgroundColor: COLORS.blue,
    marginHorizontal: -36,
    marginTop: -36,
    paddingHorizontal: 36,
    paddingTop: 24,
    paddingBottom: 20,
    marginBottom: 20,
  },
  coverTitle: {
    fontSize: 20,
    fontFamily: 'Helvetica-Bold',
    color: COLORS.white,
  },
  coverSubtitle: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.85)',
    marginTop: 4,
  },
  coverMeta: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 12,
  },
  coverMetaBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    fontSize: 8,
    color: COLORS.white,
  },

  // ── Fill-in section ──────────────────────────────────────────────────────
  fillInBox: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 4,
    padding: 12,
    marginBottom: 16,
  },
  fillInTitle: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: COLORS.textMed,
    marginBottom: 10,
  },
  fillInRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 8,
  },
  fillInLabel: {
    fontSize: 8,
    color: COLORS.textLight,
    width: 90,
    flexShrink: 0,
  },
  fillInLine: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.text,
    height: 12,
  },

  // ── Result card ──────────────────────────────────────────────────────────
  resultCard: {
    borderWidth: 2,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  resultCardLabel: {
    fontSize: 9,
    color: COLORS.textLight,
    marginBottom: 4,
  },
  resultCardAmount: {
    fontSize: 24,
    fontFamily: 'Helvetica-Bold',
  },
  resultCardNote: {
    fontSize: 8,
    marginTop: 4,
  },

  // ── Summary grid ─────────────────────────────────────────────────────────
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  summaryCell: {
    width: '47%',
    backgroundColor: COLORS.bg,
    borderRadius: 6,
    padding: 8,
  },
  summaryCellLabel: {
    fontSize: 7,
    color: COLORS.textLight,
    marginBottom: 2,
  },
  summaryCellValue: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: COLORS.text,
  },

  // ── Table ────────────────────────────────────────────────────────────────
  table: {
    width: '100%',
    marginBottom: 12,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: COLORS.blue,
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 3,
    marginBottom: 2,
  },
  tableHeaderCell: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    color: COLORS.white,
  },
  tableRow: {
    flexDirection: 'row',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  tableRowAlt: {
    backgroundColor: COLORS.bg,
  },
  tableCell: {
    fontSize: 8,
    color: COLORS.text,
  },
  tableTotalRow: {
    flexDirection: 'row',
    paddingHorizontal: 6,
    paddingVertical: 4,
    backgroundColor: COLORS.blueLight,
    borderTopWidth: 1,
    borderTopColor: COLORS.blue,
    marginTop: 2,
    borderRadius: 3,
  },
  tableTotalCell: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    color: COLORS.blueDark,
  },

  // ── Key-value rows (deductions, allowances) ──────────────────────────────
  kvRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 3,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  kvRowAlt: {
    backgroundColor: COLORS.bg,
  },
  kvLabel: {
    fontSize: 8,
    color: COLORS.text,
    flex: 1,
  },
  kvValue: {
    fontSize: 8,
    color: COLORS.text,
    textAlign: 'right',
    width: 80,
  },
  kvValueGreen: {
    fontSize: 8,
    color: COLORS.green,
    textAlign: 'right',
    width: 80,
  },
  kvTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
    paddingHorizontal: 4,
    marginTop: 2,
    backgroundColor: COLORS.blueLight,
    borderRadius: 3,
  },
  kvTotalLabel: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    color: COLORS.blueDark,
  },
  kvTotalValue: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    color: COLORS.blueDark,
    textAlign: 'right',
    width: 80,
  },

  // ── Checklist ────────────────────────────────────────────────────────────
  checklistItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  checkBox: {
    width: 10,
    height: 10,
    borderWidth: 1,
    borderColor: COLORS.text,
    borderRadius: 2,
    marginRight: 6,
    flexShrink: 0,
    marginTop: 1,
  },
  checklistLabel: {
    fontSize: 8,
    color: COLORS.text,
    flex: 1,
  },
  checklistOptional: {
    fontSize: 7,
    color: COLORS.textLight,
    marginLeft: 6,
    marginTop: 1,
    flexShrink: 0,
  },

  // ── Alert / note boxes ───────────────────────────────────────────────────
  alertBox: {
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
    marginBottom: 10,
  },
  alertTitle: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 3,
  },
  alertBody: {
    fontSize: 8,
  },

  // ── Disclaimer ───────────────────────────────────────────────────────────
  disclaimer: {
    borderWidth: 1,
    borderColor: '#FDE68A',
    backgroundColor: '#FFFBEB',
    borderRadius: 4,
    padding: 8,
    marginTop: 12,
  },
  disclaimerText: {
    fontSize: 7,
    color: '#92400E',
  },
});
