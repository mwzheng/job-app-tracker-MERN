// Convert input into title case (Ex: hi there => Hi There)
export const titleCase = (input) => {
    input = input.trim();
    if (input === '') return;
    return input.split(' ').map(word => word[0].toUpperCase() + word.substr(1)).join(' ');
}

// Capitalizes the state for locations (Ex Herndon, va => Herndon, VA)
export const capitalizeState = (input) => {
    if (input === undefined) return;

    let tokens = input.split(',').map(token => token.trim());

    if (tokens[1])
        tokens[1] = tokens[1].toUpperCase();

    return tokens.join(', ');
}