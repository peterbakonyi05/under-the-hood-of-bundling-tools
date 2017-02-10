function dummyRequireDetector(content) {
    const regex = /require\(["'](\.(\/[a-zA-Z0-9\-\.]+)*)["']\)/gi;
    const matches = [];
    let match;

    while (true) {
        match = regex.exec(content);
        if (!match) {
            break;
        }
        matches.push(match[1]);
    }

    return matches;
}

module.exports = dummyRequireDetector;