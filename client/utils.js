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
    // score out of 500
    let percent = Math.floor((score / 500) * 100);
    if (percent >= 97){
        return "A+";
    }
    else if (percent >= 93 && percent <= 96){
        return "A";
    }
    else if (percent >= 90 && percent <= 92){
        return "A-";
    }
    else if (percent >= 87 && percent <= 89){
        return "B+";
    }
    else if (percent >= 83 && percent <= 86){
        return "B";
    }
    else if (percent >= 80 && percent <= 82){
        return "B-";
    }
    else if (percent >= 77 && percent <= 79){
        return "C+";
    }
    else if (percent >= 73 && percent <= 76){
        return "C";
    }
    else if (percent >= 70 && percent <= 72){
        return "C-";
    }
    else if (percent >= 67 && percent <= 69){
        return "D+";
    }
    else if (percent >= 65 && percent <= 66){
        return "D";
    }
    else{
        return "F";
    }
}