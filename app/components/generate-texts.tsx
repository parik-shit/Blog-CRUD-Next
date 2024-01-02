const generateTexts = (content: string, maxLength: number): [string, string] => {
    if (content.length <= maxLength) {
      return [content, ''];
    }
  
    const initialText = content.slice(0, maxLength);
    const expandedText = content.slice(maxLength);
  
    return [initialText, expandedText];
  };
  
  export default generateTexts;