export function addTempAvatar(array_values) {
    const colorAvatars = ['#1A66AC','#AC721A','#5C7185','#323B44','#2A2889','#751B1B'];
    const result = array_values.map(item => {
        return {
            ...item,
            avatar:colorAvatars[Math.floor(Math.random() * 6)]
        }
    });
    return result;
}