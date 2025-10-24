const Accordian = ({ question, answer, index }) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="collapse collapse-arrow bg-base-100 border border-base-300">
        <input type="radio" name="my-accordion-2" defaultChecked />
        <div className="collapse-title font-heading text-sm">{question}</div>
        <div className="collapse-content font-subheading text-xs">{answer}</div>
      </div>
    </div>
  );
};

export default Accordian;
