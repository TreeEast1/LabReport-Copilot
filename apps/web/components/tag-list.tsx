export function TagList({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span key={tag} className="rounded-full bg-accentSoft px-3 py-1 text-xs font-medium text-accent">
          {tag}
        </span>
      ))}
    </div>
  );
}
