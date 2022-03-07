interface IProps {
  title: string;
  description: string;
  time: string;
  isEven: boolean;
}

function Item(props: IProps) {
  return (
    <div className={`${styles.eventContent} ${props.isEven && 'sm:flex-row-reverse'}`}>
      <div className={styles.time}>{props.time}</div>
      <div className={styles.wrapper}>
        <p className={styles.title}>{props.title}</p>
        <p>{props.description}</p>
      </div>
    </div>
  );
}

const styles = {
  wrapper: 'sm:flex-col',
  time: 'sm:basis-2/4 relative z-0 text-2xl sm:text-3xl opacity-20 font-extrabold',
  title: 'text-gray-700 text-lg font-bold my-1',
  eventContent: 'flex w-96 sm:w-80 border-2 rounded-lg text-xs shadow m-2 p-1',
};

export default Item;