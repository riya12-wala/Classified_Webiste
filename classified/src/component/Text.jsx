import classes from './Text.module.css'

const Text = ({ text,text1 }) => {
    return (
        <h1 className={classes.heading}> {text} <span className={classes.headingClr}>{text1}</span></h1>
    )
}
export default Text;