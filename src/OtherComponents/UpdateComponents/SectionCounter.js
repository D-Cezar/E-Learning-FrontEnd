const completedSections = new Set();

export const addSection = (id) => {
  completedSections.add(id);
  console.log(completedSections);
}

export const checkIfCompleted = (id) => {
  return completedSections.has(id);
}

export const getCompletedSections = () => {
  return Array.from(completedSections);
}

export const getCompletedCount = () => {
  return completedSections.size;
}

export const setCompletedSections = (sections) => {
  completedSections.clear(); 
  sections.forEach(element => {
    completedSections.add(element);
  });
  console.log(completedSections);
}

export const resetCompletedSections = () => {
    completedSections.clear();
}