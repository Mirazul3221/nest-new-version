export function devider(data,chunkSize){
    const devideQuestion = [];
    const indexNum = []
    for (let i = 0; i < data?.length; i += chunkSize) {
        let rangeStart = i + 1;
        let rangeEnd = Math.min(i + chunkSize, data.length);
        indexNum.push(`${rangeStart} থেকে ${rangeEnd} পর্যন্ত `)
        const departQuestions = data?.slice(i, i + chunkSize)
        devideQuestion.push(departQuestions)
        indexNum.push()
    }

    return {question:devideQuestion,indexNumber:indexNum};
}