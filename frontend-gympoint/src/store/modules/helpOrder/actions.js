export function responseHelpOrder(answer, id) {
  return {
    type: '@helpOrder/RESPONSE_HELPORDER',
    payload: { answer, id },
  };
}
