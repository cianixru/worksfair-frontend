// eslint-disable-next-line import/prefer-default-export
export const toSentenceCase = sentence => sentence
    && `${sentence[0].toUpperCase()}${sentence.substr(1)}`;
