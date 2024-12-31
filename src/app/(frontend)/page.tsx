// import PageTemplate, { generateMetadata } from './[slug]/page'
// export default PageTemplate
// export { generateMetadata }

// old form
import ContributionForm from './contribution-form/contribution-form'
import NewContributionForm from './contribution-form/new-contribution-form'

export default function Page() {
  return (
    <ContributionForm />
    // <NewContributionForm />
  )
}
