import { Page, Text, View } from '@react-pdf/renderer';
import { ChecklistItem, groupChecklistBySection } from '../utils/checklistGenerator';
import { styles, COLORS } from './pdfStyles';

interface PDFChecklistProps {
  items: ChecklistItem[];
  taxYear?: number;
}

const PageHeader: React.FC<{ taxYear: number }> = ({ taxYear }) => (
  <View style={styles.sectionPageHeader}>
    <Text style={styles.sectionPageTitle}>Supporting Documents Checklist</Text>
    <Text style={styles.sectionPageMeta}>Thai Tax Calculator · Tax Year {taxYear}</Text>
  </View>
);

const PageFooter: React.FC = () => (
  <View style={styles.pageFooter}>
    <Text>Thai Tax Calculator — Tax Filing Packet</Text>
    <Text>Page 5 — Document Checklist</Text>
  </View>
);

const PDFChecklist: React.FC<PDFChecklistProps> = ({ items, taxYear = 2025 }) => {
  const grouped = groupChecklistBySection(items);
  const sections = Object.keys(grouped);

  return (
    <Page size="A4" style={styles.page}>
      <PageHeader taxYear={taxYear} />

      <View style={[styles.alertBox, { borderColor: COLORS.blue, backgroundColor: COLORS.blueLight, marginBottom: 12 }]}>
        <Text style={[styles.alertBody, { color: COLORS.blueDark }]}>
          Bring these documents to your tax preparer or have them ready when filing online at
          efiling.rd.go.th. Items marked OPTIONAL are recommended but not strictly required.
        </Text>
      </View>

      {sections.map(section => {
        const sectionItems = grouped[section];
        const required = sectionItems.filter(i => i.required);
        const optional = sectionItems.filter(i => !i.required);
        return (
          <View key={section}>
            <Text style={styles.sectionTitle}>{section}</Text>
            {required.map((item, i) => (
              <View key={i} style={styles.checklistItem}>
                <View style={styles.checkBox} />
                <Text style={styles.checklistLabel}>{item.label}</Text>
              </View>
            ))}
            {optional.map((item, i) => (
              <View key={`opt-${i}`} style={[styles.checklistItem, { opacity: 0.75 }]}>
                <View style={[styles.checkBox, { borderStyle: 'dashed', borderColor: COLORS.textLight }]} />
                <Text style={[styles.checklistLabel, { color: COLORS.textLight }]}>{item.label}</Text>
                <Text style={styles.checklistOptional}>OPTIONAL</Text>
              </View>
            ))}
          </View>
        );
      })}

      <View style={styles.disclaimer}>
        <Text style={styles.disclaimerText}>
          This checklist is generated based on the information you entered. Additional documents may
          be required depending on your specific situation. Please consult the Thai Revenue
          Department (rd.go.th) or a qualified tax professional for definitive guidance.
        </Text>
      </View>

      <PageFooter />
    </Page>
  );
};

export default PDFChecklist;
