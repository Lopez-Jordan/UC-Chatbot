export function ObjToArr(obj) {
    return [obj.Impact, obj.Self, obj.Examples, obj.Prompt, obj.Grammar, obj.Overall];
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

export function convertToGrade (score){
    if (score >= 97){
        return "A+";
    }
    else if (score >= 93 && score <= 96){
        return "A";
    }
    else if (score >= 90 && score <= 92){
        return "A-";
    }
    else if (score >= 87 && score <= 89){
        return "B+";
    }
    else if (score >= 83 && score <= 86){
        return "B";
    }
    else if (score >= 80 && score <= 82){
        return "B-";
    }
    else if (score >= 77 && score <= 79){
        return "C+";
    }
    else if (score >= 73 && score <= 76){
        return "C";
    }
    else if (score >= 70 && score <= 72){
        return "C-";
    }
    else if (score >= 67 && score <= 69){
        return "D+";
    }
    else if (score >= 65 && score <= 66){
        return "D";
    }
    else{
        return "F";
    }
}

export function addLineBreaks(text) {
    // Use regular expression to add a newline after each number
    const newText = text.replace(/(\d:)/g, '$1\n');
    return newText;
}

export function formatConvHistory (messages) {
    return messages.map((message, i) => {
        if (i % 2 === 0){
            return `Human: ${message}`
        } else {
            return `AI: ${message}`
        }
    }).join('\n')
} 