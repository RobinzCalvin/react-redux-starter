import { Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import { GetClassKey } from 'shared/types/app';
import { rule } from 'shared/helpers/style';

const styles = (theme: Theme) => ({
  link: rule({
    margin: theme.spacing.unit,
    '&:visited': {
      color: theme.palette.primary.light,
    },
    '&:hover, &:active': {
      color: theme.palette.primary.dark,
      textDecoration: 'underline',
    },
  }),

  toolbarRoot: rule({
    justifyContent: 'center',
  }),
});

export const provideStyles = withStyles(styles);

export type StylesProps = WithStyles<GetClassKey<typeof styles>>;
