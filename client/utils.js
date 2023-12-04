export function ObjToArr(obj) {
    return [obj.Impact, obj.Self, obj.Examples, obj.Prompt, obj.Grammar];
}

export function formatNicely(text) {

    const commentaries = text.split(/\d+\./).filter(Boolean);
    const formattedCommentaries = commentaries.map(commentary => {
        const lines = commentary.trim().split('\n');
        const formattedParagraph = lines.filter(line => line.trim() !== '').join(' ');
        return formattedParagraph;
    });
    const result = formattedCommentaries.join('\n\n');
    return result;
}