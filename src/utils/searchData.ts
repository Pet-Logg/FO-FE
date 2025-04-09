interface Searchable {
  title: string
  content: string
}

export const searchData = <T extends Searchable>(
  data: T[],
  query: string
): T[] => {
  if (!query) return data

  return data.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.content.toLowerCase().includes(query.toLowerCase())
  )
}
