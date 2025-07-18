# CLAUDE.md - Birmingham HVAC Project Instructions

## Project Overview
This is the Birmingham HVAC website (www.hvac35242.com) - a programmatic SEO project targeting 46 ZIP codes and 82 neighborhoods in the Birmingham, Alabama area.

## Current Infrastructure
- **Server**: DigitalOcean Droplet (142.93.194.81)
- **Production**: https://www.hvac35242.com (Docker container on port 3001)
- **Development**: https://dev.hvac35242.com (Docker container on port 3002)
- **SSL**: Let's Encrypt certificates (working on DigitalOcean)
- **Docker**: ALL containers run on DigitalOcean (NO LOCAL DOCKER)

## SEO Assets

 TOP 10 AFFLUENT:
  1. Mountain Brook
  2. Vestavia Hills
  3. Hoover
  4. English Village
  5. Cahaba Heights
  6. Pelham
  7. Helena
  8. Trussville
  9. Chelsea
  10. Alabaster

  MIDDLE 15:
  11. Irondale
  12. Springville
  13. Gardendale
  14. Fultondale
  15. Clay
  16. Pinson
  17. Center Point
  18. Warrior
  19. Bessemer
  20. Hueytown
  21. Leeds
  22. Moody
  23. Odenville
  24. Riverside
  25. Kimberly

  EXTENDED 21:
  26. Locust Fork
  27. Blountsville
  28. Cleveland
  29. Steele
  30. Ashville
  31. Riverchase
  32. Bessemer West
  33. Forestdale
  34. West End
  35. North Birmingham
  36. East Birmingham
  37. Smithfield
  38. Ensley
  39. Fairfield
  40. Wylam
  41. Tarrant
  42. Center Point South
  43. Homewood South
  44. Homewood West
  45. Forestdale North
  46. Eastwood

- **12 semantic categories** for programmatic generation

## Key Strategies
1. **ZIP Code Domination**: 46 ZIP codes × 20 services = 920 pages
2. **Neighborhood Coverage**: 82 neighborhoods × 10 services = 820 pages
3. **EEAT Authority**: Expert content with local Birmingham focus
4. **Eugene Schwartz Awareness Levels**: Content matched to user intent
5. **Gary Halbert AIDA**: Conversion-optimized copywriting

## Priority Implementation
1. **Week 1**: Emergency service pages (highest revenue)
2. **Week 2**: ZIP code location pages (geographic coverage)
3. **Week 3**: Cost/pricing pages (high buyer intent)
4. **Week 4**: Complete programmatic rollout

## Quality Standards
- Variable word counts based on page type:
  - Location pages: 150-300 words + rich visuals
  - Service pages: 400-800 words + detailed visuals
- Visual content compensates for shorter text on location pages
- Local Birmingham/Alabama references required (3-5 per page, scaled to content length)
- EEAT signals (credentials, experience, reviews) on every page
- Mobile-responsive with 90+ PageSpeed score
- Clear CTAs with phone number: (205) 835-0111
- Multi-platform optimization:
  - Google: Featured snippets and local pack
  - Bing: Visual search and entity markup
  - ChatGPT: Structured data and clear hierarchy
  - Perplexity: Authoritative sources and citations
  - Voice Search: Natural language and FAQ schema

## Development Commands
```bash
# Access DigitalOcean server
ssh root@142.93.194.81

# Navigate to project ON DIGITALOCEAN
cd /root/birmingham-hvac

# Deploy production ON DIGITALOCEAN
docker-compose -f docker-compose.prod.yml up --build -d

# Check logs ON DIGITALOCEAN
docker logs birmingham-hvac-live

# Deploy dev site ON DIGITALOCEAN
docker-compose -f docker-compose.dev.yml up --build -d

# ALL DOCKER COMMANDS RUN ON DIGITALOCEAN - NO LOCAL DOCKER
```

## Important Notes

- Every page must have unique, valuable content
- Focus on quality over quantity for Google rankings
- Use real  data and references