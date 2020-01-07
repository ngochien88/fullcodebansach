function sqrT(n) {
    for (i = 1; i * i <= n; i++);
    return i;
}
console.log(sqrT(9));