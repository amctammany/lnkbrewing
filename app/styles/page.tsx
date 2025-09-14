import StylesTablePage from "./_components/StylesTablePage/StylesTablePage";
import { getStyles } from "./queries";
export const metadata = {
  title: "LNK: Styles",
};

export default async function StylesListPage() {
  const styles = await getStyles();
  return <StylesTablePage styles={styles} />;
}
