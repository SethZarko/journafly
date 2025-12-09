interface IPhilosopher {
  philosopher: string;
}

const philosopherArray: IPhilosopher[] = [
    { philosopher: "Heraclitus" },
    { philosopher: "Parmenides" },
    { philosopher: "Socrates" },                 // c. 470–399 BCE
    { philosopher: "Plato" },                    // c. 428–348 BCE
    { philosopher: "Aristotle" },                // 384–322 BCE
    { philosopher: "Cicero" },                   // 106-43 BCE
    { philosopher: "Seneca" },                   // c. 4 BCE-65 CE
    { philosopher: "Marcus+Aurelius" },          // 121-180 CE
    { philosopher: "Epicurus" },                 // 341–270 BCE
    { philosopher: "Thomas+Aquinas" },           // 1225–1274
    { philosopher: "Thomas+Hobbes" },            // 1588–1679
    { philosopher: "René+Descartes" },           // 1596–1650
    { philosopher: "Baruch+Spinoza" },           // 1632–1677
    { philosopher: "John+Locke" },               // 1632–1704
    { philosopher: "David+Hume" },               // 1711–1776
    { philosopher: "Immanuel+Kant" },            // 1724–1804
    { philosopher: "Georg+Wilhelm+Friedrich+Hegel" }, // 1770–1831
    { philosopher: "Arthur+Schopenhauer" },      // 1788–1860
    { philosopher: "John+Stuart+Mill" },         // 1806–1873
    { philosopher: "Søren+Kierkegaard" },        // 1813–1855
    { philosopher: "Friedrich+Nietzsche" },      // 1844–1900
    { philosopher: "Bertrand+Russell" },         // 1872–1970
    { philosopher: "Ludwig+Wittgenstein" },      // 1889–1951
    { philosopher: "Martin+Heidegger" },         // 1889–1976
];

interface IPhilosopherSelectProps {
  selectedName: string;
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const PhilosopherSelect: React.FC<IPhilosopherSelectProps> = ({
  selectedName,
  handleChange,
}): React.ReactNode => {
  return (
    <select value={selectedName} onChange={handleChange}>
      {philosopherArray?.map(({ philosopher }: IPhilosopher, index) => (
        <option key={index} value={philosopher}>
          {philosopher.split("+").join(" ")}
        </option>
      ))}
    </select>
  );
};
