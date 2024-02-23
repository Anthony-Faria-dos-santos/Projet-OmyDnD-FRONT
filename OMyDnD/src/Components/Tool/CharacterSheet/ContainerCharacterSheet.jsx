import TableNotes from "./TableNotes.jsx";
import CharacterSheet from "./CharacterSheet.jsx";

function ContainerCharacterSheet() {
  return (
    <div className="grid grid-cols-1 2xl:grid-cols-2">
      <CharacterSheet />
      <TableNotes />
    </div>
  );
}

export default ContainerCharacterSheet;
