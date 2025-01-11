export const groupMessagesBysender =(messsages) => {
    if (messsages === null) return
    let testG = []
    const groupedMessages = [];
    let currentGroup = [messsages[0]]
     for (let i = 1; i < messsages.length; i++) {
 
        const prevMessage = messsages[i-1];
        const currentMessage = messsages[i];
        if (currentMessage.senderId === prevMessage.senderId) {
         currentGroup.push(currentMessage)
        } else {
         groupedMessages.push(currentGroup)
         currentGroup = [currentMessage]
         testG = [currentMessage]
        }
     }
     groupedMessages.push(currentGroup)
 
    return  groupedMessages
 }