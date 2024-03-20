export const SubmitButton = (props) => {
    const { text, className } = props;
    return (
      <>
        <button type="submit" className={className}>
          {text}
        </button>
      </>
    );
  };
  