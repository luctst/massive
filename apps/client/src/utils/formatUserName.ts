export default function formatName(name: string, family_name: string) {
  return `${name} ${family_name[0].toUpperCase()}`;
}
