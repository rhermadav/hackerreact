function randomPoints(col, valX) {
    var numbers = new Set();

    while (numbers.size < valX) numbers.add(Math.floor(Math.random() * col));

    return [...numbers];
}

export default randomPoints

